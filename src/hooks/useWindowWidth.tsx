import React from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  })

  return windowWidth;
}

export default useWindowWidth;