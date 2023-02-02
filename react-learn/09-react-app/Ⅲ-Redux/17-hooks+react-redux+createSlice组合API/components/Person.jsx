import { addPerson } from "@/redux/slices/person";
import { unwrapState } from "@/utils";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Person() {
  const nameRef = useRef();
  const ageRef = useRef();
  const { count, person } = unwrapState(useSelector((state) => state));
  const dispatch = useDispatch();

  const handleAddPerson = () => {
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    if (name && age) {
      dispatch(
        addPerson({
          name,
          age,
        })
      );
    }
  };

  return (
    <div>
      <h2>Person Component</h2>
      <p>Count is {count}</p>
      <input
        type="text"
        ref={nameRef}
        placeholder={"填写人名"}
      />
      <input
        type="text"
        ref={ageRef}
        placeholder={"填写年龄"}
      />
      <button onClick={handleAddPerson}>提交</button>
      <div>
        <ul>
          {person.length > 0
            ? person.map((p) => (
                <li>
                  Name: <strong>{p.name}</strong> | Age:{" "}
                  <strong>{p.age}</strong>
                </li>
              ))
            : "Waiting for person"}
        </ul>
      </div>
    </div>
  );
}
