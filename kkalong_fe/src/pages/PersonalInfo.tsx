import React from 'react'

export default function PersonalInfo() {
  const iframePart = () => {
    return {
      __html: '<iframe src="../html/PersonalInfo.html" width="360px" height="100%"></iframe>',
    };
  };
  return (
    <div
        style={{ margin: 'auto', position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
        dangerouslySetInnerHTML={iframePart()}
      />
  )
}
