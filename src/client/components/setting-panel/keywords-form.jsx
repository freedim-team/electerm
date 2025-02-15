import {
  Form,
  Input,
  Select,
  Space,
  Button
} from 'antd'
import { formItemLayout } from '../../common/form-layout'
import {
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'

const FormItem = Form.Item
const FormList = Form.List
const OptionSel = Select.Option
const { prefix } = window
const f = prefix('form')

export default function KeywordForm (props) {
  const {
    formData
  } = props
  const [formChild] = Form.useForm()
  function handleTrigger () {
    formChild.submit()
  }

  function handleFinish (data) {
    props.submit(data)
  }

  function checker (_, value) {
    try {
      return Promise.resolve(!!new RegExp(`(${value})`, 'gi'))
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }

  function renderItem (field, i, add, remove) {
    return (
      <Space
        align='center'
        key={field.key}
        className='mg3r'
      >
        <FormItem
          hasFeedback
        >
          <FormItem
            noStyle
            required
            name={[field.name, 'keyword']}
            rules={[{ validator: checker }]}
          >
            <Input
              addonBefore={renderBefore(field.name)}
            />
          </FormItem>
        </FormItem>
        <Button
          icon={<MinusCircleOutlined />}
          onClick={() => remove(field.name)}
          className='mg24b'
        />
      </Space>
    )
  }

  function renderBefore (name) {
    const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']
    return (
      <FormItem name={[name, 'color']} noStyle>
        <Select>
          {
            colors.map(color => {
              const ps = {
                className: 'color-picker-choose iblock',
                style: {
                  backgroundColor: color
                }
              }
              return (
                <OptionSel key={color} value={color}>
                  <span
                    {...ps}
                  />
                </OptionSel>
              )
            })
          }
        </Select>
      </FormItem>
    )
  }

  return (
    <div>
      <Form
        form={formChild}
        onValuesChange={handleTrigger}
        initialValues={formData}
        onFinish={handleFinish}
      >
        <FormItem {...formItemLayout}>
          <FormList
            name='keywords'
          >
            {
              (fields, { add, remove }, { errors }) => {
                return (
                  <div>
                    {
                      fields.map((field, i) => {
                        return renderItem(field, i, add, remove)
                      })
                    }
                    <FormItem>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        {f('keyword')}
                      </Button>
                    </FormItem>
                  </div>
                )
              }
            }
          </FormList>
        </FormItem>
      </Form>
    </div>
  )
}
