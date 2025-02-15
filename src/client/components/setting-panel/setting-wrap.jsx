/**
 * settings page
 */

import { Component } from 'react'
import { Drawer } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { sidebarWidth } from '../../common/constants'
import './setting-wrap.styl'

export default class SettingWrap extends Component {
  render () {
    const pops = {
      open: this.props.visible,
      onClose: this.props.onCancel,
      className: 'setting-wrap',
      width: this.props.innerWidth - sidebarWidth,
      zIndex: 888,
      placement: 'left',
      destroyOnClose: true,
      headerStyle: {
        display: 'none'
      }
    }
    return (
      <Drawer
        {...pops}
      >
        <CloseCircleOutlined
          className='close-setting-wrap'
          onClick={this.props.onCancel}
        />
        {this.props.visible ? this.props.children : null}
      </Drawer>
    )
  }
}
