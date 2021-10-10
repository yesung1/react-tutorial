import React, { useRef, useState } from 'react';

function User2 () {
    
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
    });

    const [users, setUsers] = useState([
        {
          id: 1,
          username: 'velopert',
          email: 'public.velopert@gmail.com',
          active: true,
        },
        {
          id: 2,
          username: 'tester',
          email: 'tester@example.com',
          active: false,
        },
        {
          id: 3,
          username: 'liz',
          email: 'liz@example.com',
          active: false,
        }
    ]);

    
    const nextId = useRef(4);
      
    const {username, email} = inputs;

    const onChange = (e) => {
        const {name , value} = e.target;

        setInputs({
            ...inputs,
            [name] : value
        });
    };

    function onReset () {
        const user = {
            id : nextId.current,
            username,
            email
        }
        setUsers([...users, user]);
        setInputs({
            username: '',
            email: '',
        })
        nextId.current += 1;
    };

    function onRemove (id){
        return (
            setUsers(users.filter(user => user.id !== id))
        );
    }

    function onActive(id){
        
        return (
            setUsers(
                users.map(user =>
                  user.id === id ? { ...user, active: !user.active } : user
                )
            )
        )
    };

    function UserList ({Users}){
        return (
            Users.map(user =>
                <User user={user} key={user.id} />
            )
        );
    }
    function User ({user}){
        return (
            <>
                <div>
                    <span onClick={() => onActive(user.id) } style={
                        {marginRight:"10px", color : user.active ? "green" : "black", fontWeight : 'bold',cursor:"pointer"}
                    }>{user.username}</span>
                    <span>{user.email}</span>
                    <button onClick={() => onRemove(user.id)}>삭제</button>
                </div>
            </>
        );
    }

    return (        
        <>
            <input name="username" onChange={onChange} value={username}></input>
            <input name="email" onChange={onChange} value={email} ></input>
            <button onClick={onReset}>제출</button>
            <UserList Users={users} />
        </>
    );
};

export default User2;