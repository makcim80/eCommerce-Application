export function getFullElementWidth(element: HTMLElement): number | null {
  const measuredElement = element instanceof HTMLElement ? element : document.querySelector(element);
  let fullWidth: number | null = null;

  if (measuredElement instanceof HTMLElement) {
    const styles = window.getComputedStyle(measuredElement);
    const marginX = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);

    fullWidth = measuredElement.offsetWidth + marginX;
  }

  return fullWidth;
}

export function getFullElementStylesWidth(element: HTMLElement): number | null {
  const measuredElement = element instanceof HTMLElement ? element : document.querySelector(element);
  let fullStylesWidth: number | null = null;

  if (measuredElement instanceof HTMLElement) {
    const styles = window.getComputedStyle(measuredElement);
    const marginX = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);

    fullStylesWidth = parseFloat(styles.width) + marginX;
  }

  return fullStylesWidth;
}

export function getFullElementContentWidth(element: HTMLElement): number | null {
  const measuredElement = element instanceof HTMLElement ? element : document.querySelector(element);
  let contentWidth: number | null = null;

  if (measuredElement instanceof HTMLElement) {
    const styles = window.getComputedStyle(measuredElement);
    const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

    contentWidth = measuredElement.offsetWidth - paddingX;
  }

  return contentWidth;
}

export function observeElementDOMAppearance(
  observingHTMLElement: HTMLElement | null,
  observerCallback: () => void,
): void {
  if (!(observingHTMLElement instanceof HTMLElement)) {
    throw new Error('Error while setup dom appearance observer: observingHTMLElement must be instance of HTMLElement!');
  }
  const swiperSliderObserver = new MutationObserver(() => {
    const observingElement = observingHTMLElement;
    if (observingElement) {
      if (document.contains(observingElement)) {
        observerCallback();
        swiperSliderObserver.disconnect();
      }
    }
  });

  const observeParams = {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
  };
  swiperSliderObserver.observe(document, observeParams);
}
