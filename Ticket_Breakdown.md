# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

I am assuming that data stored in SQL database and following are the structures of the tables.
There are Facilities and Agents table which will have primary id and some meta data. Shift table will contain the shifts of the agents posted by the facility. It will also contain if the agent is booked or not. Shifts will have start time and end time. We can calculate working hours by thier difference.

Lets also assume that custom agent id will be alpha numeric, only ascii and Max Length 20 characters.

### Facilities

| id  | Name       | Address |
| --- | ---------- | ------- |
| 1   | Facility 1 | India   |
| 2   | Facility 2 | India   |

### Agents

| id  | Name    | Phone   | Age |
| --- | ------- | ------- | --- |
| 1   | Agent 1 | 0000000 | 25  |
| 2   | Agent 2 | 0000000 | 26  |

### Shifts

| id  | AgentId | FacilityId | StartTime                | EndTime                  | IsBooked |
| --- | ------- | ---------- | ------------------------ | ------------------------ | -------- |
| 1   | 1       | 1          | 2023-01-23T08:00:00.783Z | 2023-01-23T20:00:00.783Z | false    |
| 2   | 2       | 2          | 2023-01-22T08:00:00.783Z | 2023-01-22T20:00:00.783Z | true     |

#### Ticket Breakdown

    I am breaking the tickets into following sub tickets.

    1. Add `CustomId` column to Agents Table.
    2. Update `getShiftsByFacility` function to return `CustomAgentId`
    3. Update `generateReport` function to take `CustomAgentId`

#### 1 . Add `CustomId` column to Agents Table.

    Accept Criteria:

    1.  Add `CustomId` column to Agents Table.
    2.  The Column should be Nullable and type Varchar and Max Length 20
    3.  Run Migration to Add Column and Add Null as initial value

    Time/effort: Max 1 day

    1. 1-2 hours in code change.
    2. Migration mostly done in Low traffic time (eg night).

**Note: The `CustomId` is user editable field and can be changed in future. Thus it should not be used in any SQL reltions and only used as Meta data.**

#### 2. Update `getShiftsByFacility` function to return `CustomId`

    Accept Criteria:

    1. Project `CustomId` as `AgentCustomId` column in sql query.
    2. Add `AgentCustomId` to return type schema (TS inteface or JSDoc comments).
    3. Add `AgentCustomId` value in return object.
    4. Update Tests.

    Time/effort: 2-3 hour

#### 3. Update `generateReport` function to take `CustomAgentId`.

    Accept Criteria:

    1. Add `AgentCustomId` to argument object schema as optional value.
    2. In print function use `CustomAgentId` as `AgentId` if available. otherwise fallback to `AgentId`
    3. Update Tests.

    Time/effort: 2-3 hour
