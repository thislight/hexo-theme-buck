

hexo.extend.filter.register("marked:renderer", function(renderer) {
  renderer.table = (header, body) => {
    return `<div class="table-responsive" data-buck-baked="true"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`
  }
});
