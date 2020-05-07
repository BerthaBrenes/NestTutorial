export interface Tasks{
    id: string,
    title: string,
    description: string,
    status: Taskstatus
}
export enum Taskstatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}