import { Component } from "react"
import PropTypes from "prop-types"

class FilterInstance extends Component {
  componentDidMount() {
    const { media, outputRef } = this.props
    if (outputRef) outputRef(media)
  }

  render() {
    return null
  }
}

FilterInstance.propTypes = {
  media: PropTypes.object,
  outputRef: PropTypes.func
}

export default FilterInstance
