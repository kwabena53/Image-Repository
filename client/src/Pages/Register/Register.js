

import { Form, Input, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { signup } from './duck/action';


const Register = () => {
    const dispatch = useDispatch()

    const onFinish = (values) => {
        console.log('Success:', values);

        dispatch(signup(values))
    };

    

    return (
        <Card title="Get an account!" style={{ width: 500 }}>
            <Form
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item label="Full Name">
                    <Form.Item
                        name="full_name"
                        noStyle
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!',
                            },
                        ]}
                    >
                        <Input size='large' />
                    </Form.Item>
                </Form.Item>
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
                        <Input size='large'/>
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
                    <Button size='large' type="primary" block htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>

    );
};


export default Register