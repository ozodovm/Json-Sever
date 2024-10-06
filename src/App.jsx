import { Button, Input } from 'antd';
import './App.css';
import Item from './components/Item';
import Selected from './components/Selected';
import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [statusUsers, setStatusUsers] = useState("1");
  const [refreshStudent, setRefreshStudent] = useState(false);
  const [refreshTeachers, setRefreshTeachers] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      surname: e.target.surname.value,
    };
    if (statusUsers == "1") {
      data.study = e.target.jobOrStudy.value;
      fetch("http://localhost:3000/students", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        setRefreshStudent(!refreshStudent);
      });
    } else {
      data.job = e.target.jobOrStudy.value;
      fetch("http://localhost:3000/teachers", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        setRefreshTeachers(!refreshTeachers);
      });
    }
    e.target.reset();
  }

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, [refreshStudent]);

  useEffect(() => {
    fetch("http://localhost:3000/teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, [refreshTeachers]);

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="w-[600px] p-5 rounded-md bg-slate-400 mx-auto my-10 "
        autoComplete="off"
      >
        <div className="flex items-center justify-between space-x-5 ">
          <div className=" flex flex-col w-[50%] gap-5">
            <Selected statusUsers={statusUsers} setStatusUsers={setStatusUsers} />
            <Input
              className="w-full"
              required
              allowClear
              size="large"
              name="jobOrStudy"
              type="text"
              placeholder={`Enter your ${statusUsers === "1" ? "study" : "job"}`}
            ></Input>
          </div>
          <div className=" flex flex-col w-[50%] gap-5">
            <Input
              name="name"
              className="w-full"
              required
              allowClear
              size="large"
              type="text"
              placeholder="Enter name"
            ></Input>
            <Input
              name="surname"
              className="w-full"
              required
              allowClear
              size="large"
              type="text"
              placeholder="Enter surname"
            ></Input>
          </div>
        </div>
        <Button htmlType="submit" className="mt-3 w-full" size="large" type="primary">
          Add {statusUsers === "1" ? "Student" : "Teacher"}
        </Button>
      </form>
      <div className="flex justify-center gap-20 p-10">
        <ul className="bg-slate-400 p-5 rounded-md space-y-4">
          {students.map((item) => (
            <Item key={item.id} item={item} refreshTeachers={refreshTeachers} setRefreshTeachers={setRefreshTeachers} refreshStudent={refreshStudent} setRefreshStudent={setRefreshStudent}  />
          ))}
        </ul>
        <ul className="bg-slate-400 p-5 rounded-md space-y-4">
          {teachers.map((item) => (
            <Item key={item.id} item={item} refreshStudent={refreshStudent} setRefreshStudent={setRefreshStudent} refreshTeachers={refreshTeachers} setRefreshTeachers={setRefreshTeachers} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
