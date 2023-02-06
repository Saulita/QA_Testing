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

Then('the response has HTTP status {int}', (status: number) => {
  I.expectEqualValue(mockApiService.response.status, status);
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

Then('the response is an array of programs', () => {
  I.expectEqualArray(mockApiService.programs, mockApiService.programs);
});

Then('each program has the following properties with values of type', () => {

});
Then('tasks contains objects where each object has the following properties with values of type', () => {

});

Then('questions contains objects where each object has the following properties with values of type', () => {

});

Then('measurements contains objects where each object has the following properties with values of type', () => {

});

