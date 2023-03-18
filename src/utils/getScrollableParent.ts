// Based on: https://gist.github.com/twxia/bb20843c495a49644be6ea3804c0d775?permalink_comment_id=2899112#gistcomment-2899112

const REGEXP_SCROLL_PARENT = /^(visible|hidden)/;

const getScrollableParent = (element: HTMLElement): HTMLElement =>
  element.scrollHeight >= element.clientHeight &&
  !REGEXP_SCROLL_PARENT.test(
    window.getComputedStyle(element).overflowY || 'visible'
  )
    ? element
    : element.parentElement
    ? getScrollableParent(element.parentElement)
    : document.body;

export default getScrollableParent;
