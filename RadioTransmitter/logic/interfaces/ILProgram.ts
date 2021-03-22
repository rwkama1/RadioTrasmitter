import { Program } from "../../shared/entityshared/Program";

export interface ILProgram {
    getPrograms(): Promise<Program[]>;
    getProgramsByNameLetter(expression: string): Promise<Program[]>;
    getProgram(name: string): Promise<Program>;
    addProgram(dtprogram: Program);
    deleteProgram(dtprogram: Program);
    updateProgram(dtprogram: Program);
}