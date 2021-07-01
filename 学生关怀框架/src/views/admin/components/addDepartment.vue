<template>
  <div class="container">
    <el-dialog
      width="50%"
      :title="titleContent.title"
      :visible.sync="addVisible"
      :before-close="cancel"
      append-to-body
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="ruleForm" class="search" :model="ruleForm" :rules="addRules" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门名称：" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入部门名称" :maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门简称：" prop="abbreviation">
                <el-input v-model="ruleForm.abbreviation" placeholder="请输入部门简称" :maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="所属部门：" prop="parentIdList">
                <el-cascader
                  v-model="ruleForm.parentIdList"
                  :options="deptTree"
                  :props="props"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="启用状态：" prop="status">
                <el-radio-group v-model="ruleForm.status">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="类型：" prop="deptType">
                <el-select v-model="ruleForm.deptType" size="small">
                  <el-option v-for="(item,index) in typeArray" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：">
                <el-input v-model="ruleForm.remark" type="textarea" :rows="4" placeholder="请输入备注" :maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>

          <div class="footer">
            <el-button type="waring" @click="handleMenu">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartmentTree, getDepartmentDetails, addDepartment, editDepartment } from '../../../api/user'
export default {
  props: {
    titleContent: {
      type: Object,
      default() {
        return {}
      }
    },
    addVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      isAdd: true, // true:新增，false：修改
      props: { multiple: false, checkStrictly: true }, // 配置选项
      deptTree: [], // 部门树数据
      ruleForm: { // 提交参数
        name: '',
        abbreviation: '',
        parentIdList: [],
        status: null,
        deptType: null,
        remark: ''
      },
      typeArray: [ // 类型选择
        { value: '1', label: '机构单位' },
        { value: '2', label: '机构内部门' }
      ],
      addRules: {
        name: { required: true, message: '部门名称不能为空', trigger: 'blur' },
        abbreviation: { required: true, message: '部门简称不能为空', trigger: 'blur' },
        parentIdList: { required: true, message: '所属不能为空', trigger: 'change' },
        status: { required: true, message: '启用状态不能为空', trigger: 'change' },
        deptType: { required: true, message: '类型不能为空', trigger: 'change' }
      }
    }
  },
  mounted() {
    this.getTreeList()
    if (this.titleContent.titleEngName === 'add') {
      this.isAdd = true
    } else if (this.titleContent.titleEngName === 'edit') {
      this.isAdd = false
      this.getDetail(this.titleContent.id)
    }
  },
  methods: {
    cancel() {
      this.$emit('update:addVisible', false)
    },

    // 获取部门树
    getTreeList() {
      getDepartmentTree().then((res) => {
        this.deptTree = this.format(res.data)
      })
    },

    // 获取详情
    getDetail(id) {
      getDepartmentDetails(id).then((res) => {
        this.ruleForm = res.data
        this.ruleForm.parentIdList = res.data.parentId
      })
    },

    // 清洗部门树数据,主要是为了去掉最后一项子项的children字段
    format(list) {
      let arr = []
      for (let i in list) {
        let item = list[i]
        if (!item.children || item.children.length === 0) {
          let obj = {
            value: item.id,
            label: item.name
          }
          arr.push(obj)
        } else {
          let obj = {
            value: item.id,
            label: item.name,
            children: []
          }
          obj.children = this.format(item.children)
          arr.push(obj)
        }
      }
      return arr
    },

    // 添加修改菜单
    handleMenu() {
      let obj = JSON.parse(JSON.stringify(this.ruleForm))

      if (Object.prototype.toString.call(obj.parentIdList) === '[object Array]') {
        obj.parentId = obj.parentIdList.pop()
      } else {
        obj.parentId = obj.parentIdList
      }

      delete obj.parentIdList

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let Fn = this.isAdd ? addDepartment : editDepartment
          Fn(obj).then((res) => {
            if (res.code === 1) {
              this.$Notice({
                type: 'success',
                message: this.isAdd ? '新增成功！' : '修改成功！'
              })
              this.cancel()
              this.$parent.getTree()
              this.$parent.getList()
            } else {
              this.$Notice({
                type: 'error',
                message: res.msg
              })
            }
          })
        } else {
          this.$Notice({
            type: 'error',
            message: '请填写完整相关信息！'
          })
        }
      })
    }

  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body {
  padding: 30px;
}
::v-deep .el-dialog__footer {
  position: relative;
  text-align: center;
  padding: 0;
  height: 75px;
  .el-button {
    margin-top: 10px;
    width: 76px;
    height: 32px;
    line-height: 0.6;
  }
}

::v-deep  .el-select,.el-cascader{
  width:100%;
}

.footer{
  text-align: center;
  margin-top: 40px;
}

</style>

