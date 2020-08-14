import { IDadosCovid } from './../interfaces/exportInterfaces';
import * as admin from 'firebase-admin';
const db = admin.firestore();

class DadosCovidController {
  /**
   * Método chamado dentro da função do Cron quando ele é ativado para verificar 
   * os dados de acordo com o temporizador.
   */
  async create(dadosCovid: IDadosCovid) {
    console.log('Create');
    let collection = db.collection('covid19v3');
    collection
      .where('data', '==', dadosCovid.data)
      .get()
      .then(async (dado) => {
        if (dado.empty) {
          console.log('Gravando dados...');
          console.log(dadosCovid);
          const res = await db.collection('covid19v3').doc().set(dadosCovid);
        } else {
          console.log({ message: 'Dados já existentes' });
        }
      });
  }
}

export const dadosCovidController = new DadosCovidController();
