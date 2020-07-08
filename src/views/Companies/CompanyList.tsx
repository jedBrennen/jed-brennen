import React, { useContext, useState, useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import CompanyService from 'services/company.service';
import Company, { Role } from 'models/company.model';
import ShowcaseGrid from 'components/Showcase/ShowcaseGrid';
import Showcase from 'components/Showcase/Showcase';
import ShowcaseLoading from 'components/Showcase/ShowcaseLoading';
import Filter, { FilterOption } from 'components/Utility/Filter';

import 'assets/scss/styles/companies/company-list.scss';

const fetchCompanies = async (
  firebaseService: FirebaseService,
  onData: (data: Company[]) => void,
  onError: (error: string) => void,
  onCompletion?: () => void
) => {
  const companyService = new CompanyService(firebaseService);
  try {
    const companies = await companyService.getCompleteCompanies();
    companies.forEach((company) =>
      company.roles.sort((a, b) => a.compareTo(b, true))
    );
    companies.sort((a, b) => {
      if (!a.roles.length) return -1;
      if (!b.roles.length) return 1;
      return a.roles[0].compareTo(b.roles[0], true);
    });
    onData(companies);
  } catch {
    onError(
      'Whoops, something went when fetching those companies. Please refresh and try again.'
    );
  } finally {
    onCompletion && onCompletion();
  }
};

const getRoleSummary = (roles: Role[]) => {
  if (!roles.length) return 'No Positions';

  roles.sort((a, b) => a.compareTo(b, true));

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
  const [companies, setCompanies] = useState<{
    companies: Company[];
    options: FilterOption[];
  }>({ companies: [], options: [] });
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [filter, setFilter] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const navigateToCompany = useCallback(
    (companyId: string) => {
      const { match, history } = props;
      history.push(`${match.path}/${companyId}`);
    },
    [props]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchCompanies(
      firebaseService,
      (cs) => {
        const options: FilterOption[] = [];
        cs.forEach((company) =>
          company.skills
            .filter(
              (skill) => !options.some((option) => option.value === skill.id)
            )
            .forEach((skill) =>
              options.push({ label: skill.name, value: skill.id })
            )
        );
        setCompanies({ companies: cs, options });
        setFilteredCompanies(cs);
      },
      setError,
      () => setIsLoading(false)
    );
  }, [firebaseService]);

  useEffect(() => {
    setFilteredCompanies(
      filter
        ? companies.companies.filter((company) =>
            company.skills.some((skill) => skill.id === filter)
          )
        : companies.companies
    );
  }, [filter, companies.companies]);

  useEffect(() => {
    const { hash } = props.location;
    setFilter(hash.substring(1));
  }, [props.location]);

  return (
    <Container>
      <h1 className="mb-3 text-center">Companies</h1>
      <Alert show={!!error} variant="danger" className="mt-3">
        {error}
      </Alert>
      <Filter
        options={companies.options}
        selectedOption={companies.options.find(
          (option) => option.value === filter
        )}
        onChange={(option) => setFilter(option?.value)}
      />
      <ShowcaseGrid
        showcases={
          !isLoading
            ? filteredCompanies.map((company) => (
                <Showcase
                  key={company.id}
                  title={company.name}
                  subtitle={getRoleSummary(company.roles)}
                  onOpen={() => navigateToCompany(company.id)}
                />
              ))
            : []
        }
      >
        {isLoading && <ShowcaseLoading count={3} />}
      </ShowcaseGrid>
    </Container>
  );
};

export default CompanyList;
