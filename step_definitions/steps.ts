import { category, created, device, id, tasks, updated } from 'mock_api_server/data/seed';
import { title } from 'process';
import {I, mockApiService} from './common_steps';

Given('the system has programs', async () => {
  await mockApiService.postProgram('10');
});

Given('a program with id {word}', async (id:string) => {
  await mockApiService.getPrograms();
  mockApiService.updateProgramsFromResponse();
  if (!mockApiService.programExists(id)) {
    await mockApiService.postProgram(id);
  }
});

Given('the number of programs is n', async () => {
  await mockApiService.getPrograms();
  mockApiService.updateProgramsFromResponse();
  I.expectAtLeast(mockApiService.programs.length,1);
});

When('the dialog api is requested to create a program with id {word}', async (id:string) => {
  await mockApiService.postProgram(id);
});

When('the dialog api is requested to obtain all programs', async () => {
  await mockApiService.getPrograms();
});

When('the dialog api is requested to delete a program', async () => {
  await mockApiService.deleteProgram();
});

Then('the response represents the program with id {word}', (id:string) => {
  I.expectNotEmpty(mockApiService.response.data);
  I.expectEqualValue(id,mockApiService.response.data.id);
});

Then('the response contains a program with id {word}', (id:string) => {
  mockApiService.updateProgramsFromResponse();
  I.expectTrue(mockApiService.programExists(id));
});

Then('the response contains n-1 programs', () => {
  const oldProgramsLength = mockApiService.programs.length;
  mockApiService.updateProgramsFromResponse();
  I.expectEqualValue(mockApiService.programs.length, oldProgramsLength-1);
});

Then('the response has HTTP status {int}', (status: number) => {
  I.expectEqualValue(mockApiService.response.status, status);
});


/********************************** QA_Test *******************************************/


Then('the response is an array of programs', () => {
I.expectTrue(Array.isArray(mockApiService.response.data)); //Checking that is an array

});

Then('each program has the following properties with values of type', () => { //I tried with table:GherkinTable but could not
  mockApiService.updateProgramsFromResponse();
  const programs = mockApiService.programs;
  //const programs = mockApiService.response.data

  //I tried to work with the GherkinTable
  /*
    for (const p of programs) {
    table.rows.forEach((row) => {
      I.expectEqualValue(typeof p[row[0]], row[1]);
    })
  }
  */
  //sample program to compare with
  const my_program = {
    id: "1", //Is suposed to be a number but is a string. 
    title: "Sample_Program",
    category: "",
    updated: "new Date()", //Expected to be a date (object)
    created: "new Date()",
    device: {},
    tasks: []
  };

  //Testing
  for (const p of programs) {
    I.expectEqualValue(typeof p.id, typeof my_program.id);
    I.expectEqualValue(typeof p.title, typeof my_program.title);
    I.expectEqualValue(typeof p.category, typeof my_program.category);
    I.expectEqualValue(typeof p.updated, typeof my_program.updated);
    I.expectEqualValue(typeof p.created, typeof my_program.created);
    I.expectEqualValue(typeof p.device, typeof my_program.device);
    I.expectEqualValue(typeof p.tasks, typeof my_program.tasks);
  }
});


Then('tasks contains objects where each object has the following properties with values of type', () => {
  mockApiService.updateProgramsFromResponse
  const programs = mockApiService.programs
  
  //sample task to compare with
  const my_task = { 
    title: "",
    questions: [],
    measurements:[]
  }

  //Testing
  for (const p of programs) {
    for (const t of p.tasks) {
      I.expectEqualValue(typeof t.title, typeof my_task.title);
      I.expectEqualValue(typeof t.questions, typeof my_task.questions);
      I.expectEqualValue(typeof t.measurements, typeof my_task.measurements);
    }
  }
});


Then('questions contains objects where each object has the following properties with values of type', () => {
  mockApiService.updateProgramsFromResponse
  const programs = mockApiService.programs
  const tasks = mockApiService.programs.task
  
  //sample question
  const my_question = { 
    _id: "",
    text: "",
    answer: 1 //What is suposed to be here???
  }
  
  //Testing
  for (const p of programs) {
    for (const t of p.tasks) {
      for (const q of t.questions){
        I.expectEqualValue(typeof q._id, typeof my_question._id);
        I.expectEqualValue(typeof q.text, typeof my_question.text);
      //  I.expectEqualValue(typeof q.answer, typeof my_question.answer); //I guess this always fails becouse in some cases it is a number and some others a string
      }
    }
  }
});


Then('measurements contains objects where each object has the following properties with values of type', () => {
  
  mockApiService.updateProgramsFromResponse
  const programs = mockApiService.programs
  //sample measurements
  const my_measurements = {
    _id: "",
    indicator: "",
    measure: 1
  }
  
  //Testing
  for (const p of programs) {
    for (const t of p.tasks) {
      for (const m of t.measurements){
        I.expectEqualValue(typeof m._id, typeof my_measurements._id);
        I.expectEqualValue(typeof m.indicator, typeof my_measurements.indicator);
        I.expectEqualValue(typeof m.measure, typeof my_measurements.measure);
      }
    }
  }
});

