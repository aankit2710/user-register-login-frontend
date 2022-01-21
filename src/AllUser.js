import { axios } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./App.css";

function AllUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        console.log(data)

        var header = {
            "Content-Type": "application/json",
        };

        const body = {
            "userName": data.userName,
            "password": data.password
        };

        console.log(body);

        const url = "localhost:4200/api/user/login";
        const responseData = await axios.post(url, body, {
            headers: header,
        });
        console.log(responseData);
    };



    return (
        <div>
            <h1>Login User</h1>
            <Form action="" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Control type="text" placeholder="UserName" {...register("userName", { required: true })} />
                    {errors.userName && <span>userName is required</span>}
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Control type="password" placeholder="password" {...register("password", { required: true })} />
                    {errors.password && <span>password is required</span>}
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        </div>
    );
}

export default AllUser;