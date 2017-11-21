import {h, Component} from 'composi'
import {interpolateWarm, select, scaleLinear} from 'd3'


Math.deg = radians => radians * (180 / Math.PI)

const memoizedCalc = (function() {
  const memo = {}
  const key = ({ w, heightFactor, lean }) => [w, heightFactor, lean].join("-")
  return args => {
    const memoKey = key(args)
    if (memo[memoKey]) {
      return memo[memoKey]
    } else {
      const { w, heightFactor, lean } = args
      const trigH = heightFactor * w
      const result = {
        nextRight: Math.sqrt(trigH ** 2 + (w * (0.5 + lean)) ** 2),
        nextLeft: Math.sqrt(trigH ** 2 + (w * (0.5 - lean)) ** 2),
        A: Math.deg(Math.atan(trigH / ((0.5 - lean) * w))),
        B: Math.deg(Math.atan(trigH / ((0.5 + lean) * w)))
      }
      memo[memoKey] = result
      return result
    }
  }
})()

const Pythagoras = ({
  w,
  x,
  y,
  heightFactor,
  lean,
  left,
  right,
  lvl,
  maxlvl
}) => {
  if (lvl >= maxlvl || w < 1) {
    return null
  }
  const { nextRight, nextLeft, A, B } = memoizedCalc({
    w: w,
    heightFactor: heightFactor,
    lean: lean
  })
  let rotate = ""
  if (left) {
    rotate = `rotate(${-A} 0 ${w})`
  } else if (right) {
    rotate = `rotate(${B} ${w} ${w})`
  }
  return (
    <g id='svg-root' ns="svg" transform={`translate(${x} ${y}) ${rotate}`}>
      <rect
        width={w}
        height={w}
        x={0}
        y={0}
        style={{
          fill: interpolateWarm(lvl / maxlvl)
        }}
      />

      <Pythagoras
        w={nextLeft}
        x={0}
        y={-nextLeft}
        lvl={lvl + 1}
        maxlvl={maxlvl}
        heightFactor={heightFactor}
        lean={lean}
        left
      />

      <Pythagoras
        w={nextRight}
        x={w - nextRight}
        y={-nextRight}
        lvl={lvl + 1}
        maxlvl={maxlvl}
        heightFactor={heightFactor}
        lean={lean}
        right
      />
    </g>
  )
}

const SVG_WIDTH = () => window.innerWidth
const SVG_HEIGHT = () => document.querySelector('section').clientHeight
const SVG = null

export class Tree extends Component {
  constructor(props) {
    super(props)
    this.realMax = 11
    this.state = {
      currentMax: 10,
      baseW: 80,
      heightFactor: 0,
      lean: 0
    }
  }
  
  render(data) {
    this.SVG_HEIGHT = SVG_HEIGHT()
    let {currentMax} = this.state
    if (currentMax < this.realMax)
    this.setState({ currentMax: currentMax + 1 })
    return (    
      <svg
        id='fractal-tree'
        width={SVG_WIDTH()}
        height={this.SVG_HEIGHT}
      >
        <Pythagoras
          w={this.state.baseW}
          h={this.state.baseW}
          heightFactor={this.state.heightFactor}
          lean={this.state.lean}
          x={SVG_WIDTH() / 2 - 40}
          y={this.SVG_HEIGHT - this.state.baseW}
          lvl={0}
          maxlvl={this.state.currentMax}
        />
      </svg>
    )
  }
  componentWasCreated() {
    this.element.addEventListener('mousemove', this)
    this.element.addEventListener('touchmove', this)
    document.body.addEventListener('touchcancel', this)
    const section = this.element.querySelector('section')
    this.SVG_HEIGHT = section && section.clientHeight || 300
  }
  handleEvent(e) {
    e.preventDefault()
    this.onMouseMove(e)
  }
  onMouseMove(e) {
    e.preventDefault()
    var x = e.clientX
    var y = e.clientY
    if (e.touches) {
      x = e.pageX
      y = e.pageY
    }
    var scaleFactor = scaleLinear().domain([this.SVG_HEIGHT, 0]).range([0, 0.8]);
    var scaleLean = scaleLinear().domain([0, SVG_WIDTH() / 2, SVG_WIDTH()]).range([0.5, 0, -0.5]);
    this.move({
      heightFactor: scaleFactor(y),
      lean: scaleLean(x)
    })
  }
  move({ heightFactor, lean }) {
    this.setState({ heightFactor, lean })
  }
}