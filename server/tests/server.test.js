const expect=require('expect');
const request =require('supertest');


const {app}=require('./../server');
const {Todos}=require('./../models/todos');
const {user}=require('./../models/users');

beforeEach((done)=>{
    Todos.remove({}).then(()=>{
        done();
    });
});

describe('POST /todos',()=>{
    it('should create a todo',(done)=>{
        var text="test todo text";
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        }).end((err,res)=>{
            if(err){
                return done(err);
            }
            Todos.find().then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err)=>{
                done(err);
            });
        });
    

    });

    it('should not create a todo',(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todos.find().then((todos)=>{
                expect(todos.length).toBe(0);
                done();
            }).catch((err)=>{
                 done(err);
            });
        })
    });

});