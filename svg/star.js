import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={15} height={15} {...props}>
      <Path
        fill="#ffbd00"
        d="M7.5.25L9.375 6H15l-4.625 3.25 1.875 5.625-4.75-3.5-4.75 3.5L4.625 9.25 0 6h5.625z"
      />
    </Svg>
  )
}

export default SvgComponent