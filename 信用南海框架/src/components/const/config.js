// 下载方法抽取
export function exportFunction(data, fileName) {
  const blob = new Blob([data])
  // const fileName = val.annexName
  const linkNode = document.createElement('a')
  linkNode.download = fileName // a标签的download属性规定下载文件的名称
  linkNode.style.display = 'none'
  linkNode.href = URL.createObjectURL(blob) // 生成一个Blob URL
  document.body.appendChild(linkNode)
  linkNode.click() // 模拟在按钮上的一次鼠标单击
  URL.revokeObjectURL(linkNode.href) // 释放URL 对象
  document.body.removeChild(linkNode)
}

// 富文本编辑器设置
export const editorOption = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block', 'image'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ['formula'] // 去除video即可
    ]
  }
}
