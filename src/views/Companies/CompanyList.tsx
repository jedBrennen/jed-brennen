import React, { useContext, useState, useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { FirebaseContext } from 'services/firebase.service';
import CompanyService from 'services/company.service';
import Company, { Role } from 'models/company.model';
import ShowcaseGrid from 'components/Showcase/ShowcaseGrid';
import Showcase from 'components/Showcase/Showcase';

import 'assets/scss/styles/companies/company-list.scss';
import ShowcaseLoading from 'components/Showcase/ShowcaseLoading';

const getRoleSummary = (roles: Role[]) => {
  if (!roles.length) return 'No Positions';

  roles.sort((a, b) => {
    if ((a.endDate ?? new Date()) < (b.endDate ?? new Date())) return 1;
    if ((a.endDate ?? new Date()) > (b.endDate ?? new Date())) return -1;
    return 0;
  });

  const count = roles.length - 1;

  return (
    <span>
      <span className="company-list__role">{roles[0].title}</span>
      {count ? ` and ${count} other position${count === 1 ? '' : 's'}` : ''}
    </span>
  );
};

const CompanyList: React.FC<RouteComponentProps> = (props) => {
  const firebaseService = useContext(FirebaseContext);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigateToCompany = useCallback(
    (companyId: string) => {
      const { match, history } = props;
      history.push(`${match.path}/${companyId}`);
    },
    [props]
  );

  useEffect(() => {
    const companyService = new CompanyService(firebaseService);
    setIsLoading(true);
    const fetchCompanies = async () => {
      const p = await companyService.getCompleteCompanies();
      setCompanies(p);
      setIsLoading(false);
    };
    fetchCompanies();
  }, [firebaseService]);

  return (
    <Container>
      <h1 className="mb-3 text-center">Companies</h1>
      <ShowcaseGrid>
        {isLoading && <ShowcaseLoading count={3} />}
        {!isLoading &&
          companies.map((company) => (
            <Showcase
              key={company.id}
              title={company.name}
              subtitle={getRoleSummary(company.roles)}
              onOpen={() => navigateToCompany(company.id)}
            />
          ))}
      </ShowcaseGrid>
    </Container>
  );
};

export default CompanyList;
