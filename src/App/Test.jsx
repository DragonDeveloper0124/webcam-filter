import React, { Component } from "react"

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = { frame: 0 }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.frame > 5) clearInterval(this.interval)
      this.setState(({ frame }) => ({ frame: frame + 1 }))
    }, 1000)
  }

  render() {
    return (
      <Element name="root">
        <Element name="child1">
          <Element name="child11" />
          <Element name="child12" />
        </Element>
        <Element name="child2" />
      </Element>
    )
  }
}

class Element extends Component {
  render() {
    console.log("rendering", this.props.name)
    const { children } = this.props
    if (children) return children
    else return null
  }

  componentDidUpdate() {
    console.log(this.props.name, "did update")
  }
}

export default Test
