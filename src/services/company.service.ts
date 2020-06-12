import { db, mapFirebaseData } from 'services/firebase.service';
import { Company } from 'models/company.model';

const collectionName = 'companies';

export default class CompanyService {
  public async getCompanies() {
    let companyCollection = await db.collection(collectionName).get();
    return companyCollection.docs.map((doc) => mapFirebaseData<Company>(doc));
  }
}
