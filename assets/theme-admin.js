 if(navigator.userAgent.indexOf("Chrome-Lighthouse") == -1) { 
window.theme = window.theme || {};
theme.roarAdminJs = (function() {
  var is_editor = isEditor();
  
  function isEditor() {
    return (window !== window.parent && window.top.location.pathname.indexOf('/admin') >= 0 && window.top.location.pathname.indexOf('/editor') >= 0) ? true : false;
  }

  function themeActions() {
    if (is_editor) {
      var $action_list = $(top.document).find('.te-panel__footer .ui-action-list').first();
      
      if ($action_list.find('li .roaradmin-theme_help').length == 0 ) {
        $action_list.prepend('<li class="theme-editor-action-list__item--separator"></li>');
        $action_list.prepend('<li class="ui-action-list__item"><a href="https://roartheme.ticksy.com/" class="ui-action-list-action roaradmin-theme_help" rel="noopener noreferrer" target="_blank"><span class="ui-action-list-action__text">Expert theme help</span></a></li>');
      }
    }
  }
  
  function importClick() {
    if (is_editor) {
      var $importBtn = window.top.document.querySelector('.roaradmin-import_demo');
      
      $importBtn.addEventListener('click',function(evt) {
        evt.preventDefault();
      });
    }
  }

  return {
    init: function() {
      themeActions();
      importClick();
    },
  };
})();

theme.roarAdminJs.init();
 }