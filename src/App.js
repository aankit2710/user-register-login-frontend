import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import AllUser from "./AllUser";
import "./App.css";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
  const mobileInString = data.mobileNumber.toString();
    // eslint-disable-next-line
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const valid = regex.test(data.email)

    if (data.firstName.length < 2 || data.lastName.length < 2) {
      alert("give a valid Name")
      return;
    }
    if (!valid) {
      alert("please Give a valid email")
      return;
    }
    if (mobileInString.length < 10) {
      alert("please give a valid Mobile number")
      return;
    }

    const url = "https://user-register-login-api.herokuapp.com/api/user/register";

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const response = await fetch(url, requestOptions);
    const dataa = await response.json();
    console.log("dataa", dataa);
    if (dataa.error) {
      alert(dataa.message)
    }
    else {
      alert('User Registered Successfully')
    }
    // alert('User added Successfully')
    //     console.log(data)
  };



  return (
    <div className="App">

      <Container>
        <h1>Register User</h1>
        <Row>
          <Col>
            <div>
              <Form action="" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control type="text" placeholder="First name" {...register("firstName", { required: true })} />
                  {errors.firstName && <span>firstName is required</span>}
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control type="text" placeholder="Last name" {...register("lastName", { required: true })} />
                  {errors.lastName && <span>lastName is required</span>}
                </Form.Group>
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control type="email" placeholder="Email" {...register("email", { required: true })} />
                  {errors.email && <span>email is required</span>}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control type="text" placeholder="Number" pattern="[0-9]{10}" {...register("mobileNumber", { required: true })} />
                  {errors.mobileNumber && <span>mobile Number is required</span>}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Address"
                    {...register("address", { required: true })}
                    style={{ height: '100px' }}
                  />
                  {errors.address && <span>address is required</span>}
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
              </Form>
            </div>
          </Col>
          <Col>
            <AllUser />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
