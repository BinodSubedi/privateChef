export interface BlankFilterI {
  element: string;
  cancelCross: boolean;
}

export const blankFilterLayer = (input: BlankFilterI): HTMLDivElement => {
  const el: HTMLDivElement = document.createElement("div");
  el.style.top = "0";
  el.className = "blankFilterLayer";
  el.style.position = "absolute";
  el.style.height = "100%";
  el.style.width = "100%";
  el.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  el.style.display = "flex";
  el.style.justifyContent = "center";
  el.style.alignItems = "center";
  el.style.zIndex = "1";
  document.body.appendChild(el);

  if (input.cancelCross) {
    const cross: HTMLDivElement = document.createElement("div");
    cross.className = "blankFilterCross";
    cross.style.position = "fixed";
    cross.style.backgroundImage = "url('/icons/close-button.svg')";
    cross.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.removeChild(el);
    });
    el.appendChild(cross);
  }

  // Main Model Elements like loading and text response [summary/question-answers]

  const childElement: HTMLDivElement | null = document.createElement("div");
  childElement.className = "blankFilterChild";
  childElement.style.height = "min-content";
  childElement.style.width = "min-content";

  childElement.innerHTML = input.element;

  el.appendChild(childElement);

  return el;
};
