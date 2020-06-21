import Company, { Role } from 'models/company.model';
import FirebaseService from 'services/firebase.service';

export default class CompanyService {
  static readonly collectionName = 'companies';
  constructor(private firebase: FirebaseService) {}

  public async getCompanies() {
    const companyCollection = await this.collection
      .withConverter<Company>(Company.converter)
      .get();
    return companyCollection.docs.map((doc) => doc.data());
  }

  public async getCompany(companyId: string) {
    const companyDoc = this.collection.doc(companyId);
    const company = (
      await companyDoc.withConverter<Company>(Company.converter).get()
    ).data();
    const roleDocs = (
      await companyDoc
        .collection('roles')
        .withConverter<Role>(Role.converter)
        .get()
    ).docs;
    if (company) {
      company.roles = roleDocs.map((roleDoc) => roleDoc.data());
      return company;
    }

    return undefined;
  }

  private get collection() {
    return this.firebase.db.collection(CompanyService.collectionName);
  }
}
