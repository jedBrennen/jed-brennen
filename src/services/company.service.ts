import FirebaseService from 'services/firebase.service';
import AboutService from 'services/about.service';
import Company, { Role } from 'models/company.model';

export default class CompanyService {
  static readonly collectionName = 'companies';
  private aboutService: AboutService;

  constructor(private firebase: FirebaseService) {
    this.aboutService = new AboutService(firebase);
  }

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
    if (company) {
      company.roles = await this.getRoles(company.id);
      return company;
    }
  }

  public async getCompleteCompanies() {
    const companiesSnapshot = await this.collection.get();

    const companies = await Promise.all(
      companiesSnapshot.docs.map(async (doc) => {
        const skillIds = doc.data().skills;
        const company = Company.converter.fromFirestore(doc, {});
        company.skills = await this.aboutService.getSkills(skillIds);
        return company;
      })
    );

    return companies;
  }

  private async getRoles(companyId: string) {
    const projectDoc = this.collection.doc(companyId);
    const roleDocs = (
      await projectDoc
        .collection('roles')
        .withConverter<Role>(Role.converter)
        .get()
    ).docs;

    return roleDocs.map((doc) => doc.data());
  }

  private get collection() {
    return this.firebase.db.collection(CompanyService.collectionName);
  }
}
