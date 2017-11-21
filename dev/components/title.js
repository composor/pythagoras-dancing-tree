import {h, Component} from 'composi'

export const title = new Component({
  container: 'header',
  render: (data) => {
    return (
      <nav>
        <svg width="50px" height="50px" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Composi Logo</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Composi-Logo-Solid" fill="#DF0000">
              <path d="M1.77635684e-15,0 L95,0 L95,38 L209,38 L209,0 L300,0 L300,94 L265,93.8571663 L265,209 L300,209 L300,300 L209,300 L209,265 L95,265 L95,300 L1.77635684e-15,300 L1.77635684e-15,209 L40,209 L40,94 L1.77635684e-15,93.8571663 L1.77635684e-15,0 Z M107,107 L107,192 L192,192 L192,107 L107,107 Z" id="Combined-Shape"></path>
            </g>
          </g>
        </svg>
        <h1>This is a dancing Pythagoras tree</h1>
      </nav>
    )
  }
})