export default function AppDrag (props) {
  function canOperate (e) {
    const {
      target
    } = e
    if (
      target instanceof window.SVGElement ||
      target.classList.contains('tab-title') ||
      target.classList.contains('tab-title')
    ) {
      window.pre.runSync('windowMove', false)
      return false
    }
    return true
  }

  function onMouseDown (e) {
    if (canOperate(e)) {
      window.pre.runSync('windowMove', true)
    }
  }

  function onMouseUp (e) {
    window.pre.runSync('windowMove', false)
  }

  function onDoubleClick (e) {
    if (!canOperate(e)) {
      return window.pre.runSync('windowMove', false)
    }
    const {
      isMaximized
    } = window.store
    if (isMaximized) {
      window.pre.runGlobalAsync('unmaximize')
    } else {
      window.pre.runGlobalAsync('maximize')
    }
  }
  return (
    <div
      className='app-drag'
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
    >
      {props.children}
    </div>
  )
}
