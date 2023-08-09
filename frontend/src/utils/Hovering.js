import chroma from 'chroma-js'


const buttonHovering=()=>{

    const elements = document.getElementsByClassName('but');
      Array.from(elements).forEach(element=>{
          const originalColor= getComputedStyle(element).backgroundColor;
          const hoverColor = chroma(originalColor).darken(0.4).hex();
          element.style.setProperty('--hover-color',hoverColor);
      });
}

export default buttonHovering;