export default function getScrollHeightGap(element: HTMLElement) {
  return Math.abs(
    element.scrollHeight - element.clientHeight - element.scrollTop
  );
}
