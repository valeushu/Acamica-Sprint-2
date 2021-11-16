import fetch from 'node-fetch'
const urlAPI = "http://localhost:7000/api"
import {assert} from 'chai'

describe('testing api auth login', () => {
  it('1.api responds error 403 (sin token)', async () => {
    await fetch(urlAPI + "/auth/me").then((response) => {
      assert.equal(response.status, 403)
    });
  });
  
  it("2.api include text me (sin token)", async () => {
    await fetch(urlAPI + "/auth/me")
      .then(
        (response) => response.json())
      .then((json) => {
        assert.deepEqual(json, {
          status: 'no token provided'
        })
      });
  });
  it("3.API login and me OK", async () => {
    // LOGIN
    let response = await fetch(urlAPI + "/auth/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "email": "admin1@gmail.com",
        "password": "password",
      }),
    });
    let json = await response.json();
    const token = json.token;
    assert.deepEqual(json.status, "login" , 'Status was expected: "login"');
    assert.exists(token, "A token was expected in the response");

    //ME
    response = await fetch(urlAPI + "/auth/me", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization : 'bearer ' + token,
      },
      method: "GET",
    });
    json = await response.json();
    assert.deepEqual(json.status, "me", 'status was expected: "me"');
    assert.exists(json.data, "the key is expected in the answer");
    assert.deepEqual(json.data.username, "admin1", "the user is expected admin1");
    assert.deepEqual(
      json.data.email,
      "admin1@gmail.com",
      "the email is expected admin1@gmail.com"
    );
  });

  it("4.API login denied", async () => {
    let response = await fetch(urlAPI + "/auth/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        usuario: "user1",
        password: "otraclavecualquiera",
        email: "user1@gmail.com",
      }),
    });
    let json = await response.json();
    const token = json.token;
    assert.equal(response.status, 401);
    assert.notDeepEqual(
      json.status,
      "unauthorized",
      'the status is expected: "unauthorized"'
    ),
      assert.notExists(token, "token is expected in the answer")
    
  })
});

describe('testing api auth signup', () => {
  it("1.API signup denied", async () => {
    let response = await fetch(urlAPI + "/auth/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: "user2",
        fullname: "user2",
        password: "22212",
        phone: "15115",
        address: "san martin 120"
      }),
    });
    let json = await response.json();
    assert.equal(response.status, 500);
  });
//TODO: resetear valores
  it("2.API Signup new user", async () => {
    let response = await fetch(urlAPI + "/auth/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: "usertest",
        fullname: "usertest",
        email: "usertest@gmail.com",
        password: "password",
        phone: 8888,
        address: "maipu 181",
        
      }),
    });
    let json = await response.json();
    const token = json.token;
    assert.strictEqual(response.status, 200, "One state expected: 200");
    assert.exists(token, "A token was expected in the response");
      
  });


  it("3.API Signup email duplicated", async () => {
    let response = await fetch(urlAPI + "/auth/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: "usertest",
        fullname: "usertest",
        email: "usertest@gmail.com",
        password: "password",
        phone: 8888,
        address: "maipu 181",
      }),
    });
    let json = await response.json();
    assert.strictEqual(response.status, 400, "One state expected: 400");
    
  });
  });


  