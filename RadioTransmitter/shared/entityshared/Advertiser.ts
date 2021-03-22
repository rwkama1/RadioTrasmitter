export class Advertiser
{
    private RutAn: number;
    public get RutAnn(): number {
        return this.RutAn;
    }
    public set RutAnn(value: number) {
        this.RutAn = value;
    }
    private NomAn: string;
    public get NomAnn(): string {
        return this.NomAn;
    }
    public set NomAnn(value: string) {
        this.NomAn = value;
    }
    private DirAn: string;
    public get DirAnn(): string {
        return this.DirAn;
    }
    public set DirAnn(value: string) {
        this.DirAn = value;
    }
    private TelAn: string;
    public get TelAnn(): string {
        return this.TelAn;
    }
    public set TelAnn(value: string) {
        this.TelAn = value;
    }
   

    constructor(pRut: number, pNombre: string, pDireccion: string, pTelefono: string)
{
    this.RutAnn = pRut;
        this.NomAnn = pNombre;
        this.DirAnn = pDireccion;
        this.TelAnn = pTelefono;
}

}
