

import { Form, Input, Button, Card } from 'antd';
import { login } from "./duck/action"
import { useDispatch, useSelector } from "react-redux"
import { getPublicImgs } from '../../duck/action';

const Login = () => {
    const state = useSelector((state)=>state?.login)
    const dispatch = useDispatch()
    const onFinish = (values) => {

        console.log('Success:', values);
        dispatch(login(values))
        // dispatch(getPublicImgs())
    };


    return (
        <Card title="Welcome back!" style={{ width: 500 }}>
            <Form
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="Email">
                    <Form.Item
                        name="email"
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input size='large' />
                    </Form.Item>
                </Form.Item>

                <Form.Item label="Password">
                    <Form.Item
                        name="password"
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password size='large' />

                    </Form.Item>
                </Form.Item>


                <Form.Item
                >
                    <Button loading={state?.loggingIn} size='large' type="primary" block htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>

    );
};


export default Login