export interface Socio {
  nombre: string;
  socioDesde: string;
  plan: string;
  bolsasAlMes: number;
  precioBolsa: number; // € por bolsa de 250 g
  proximoEnvio: string; // fecha ISO
}

// Datos de mentira para el prototipo.
export const socio: Socio = {
  nombre: 'Lucía Fernández',
  socioDesde: '2026-09-15',
  plan: 'Club Tueste Norte',
  bolsasAlMes: 2,
  precioBolsa: 10.5,
  proximoEnvio: '2026-12-01',
};