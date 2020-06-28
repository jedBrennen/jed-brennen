import React, { useEffect, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import FirebaseService, { FirebaseContext } from 'services/firebase.service';
import CompanyService from 'services/company.service';
import { formatMonthYear } from 'utils/DateUtils';
import { COMPANIES } from 'constants/routes';
import Company from 'models/company.model';
import Details from 'views/Templates/Details';

import 'assets/scss/styles/companies/company-details.scss';

interface CompanyDetailsParams {
  companyId?: string;
}

const fetchCompany = async (
  companyId: string,
  firebaseService: FirebaseService,
  onData: (data: Company) => void,
  onError: (error: string) => void,
  onCompletion?: () => void
) => {
  try {
    const companyService = new CompanyService(firebaseService);
    const company = await companyService.getCompany(companyId);
    company?.skills?.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return -1;
      return 0;
    });
    company?.roles?.sort((a, b) => {
      if (a.startDate < b.startDate) return 1;
      if (a.startDate > b.startDate) return -1;
      return 0;
    });
    onData(company!);
  } catch {
    onError(
      'Whoops, something went when fetching that company. Please refresh and try again.'
    );
  } finally {
    onCompletion && onCompletion();
  }
};

const CompanyDetails: React.FC<RouteComponentProps<CompanyDetailsParams>> = (
  props
) => {
  const firebaseService = useContext(FirebaseContext);
  const [company, setCompany] = useState<Company>(new Company());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { companyId } = props.match.params;

  useEffect(() => {
    if (companyId) {
      setIsLoading(true);
      fetchCompany(companyId, firebaseService, setCompany, setError, () =>
        setIsLoading(false)
      );
    }
  }, [firebaseService, companyId]);

  return (
    <Details
      isLoading={isLoading}
      pageTitle={company.name}
      listTitle="Companies"
      listLocation={COMPANIES}
      description={company.longDescription}
      descriptionTitle={`My Time At ${company.name}`}
      skills={company.skills}
      skillsTitle={`The Tech I Used At ${company.name}`}
      error={error}
    >
      {!!company.roles.length &&
        company.roles.map((role) => {
          return (
            <>
              <h3>{role.title}</h3>
              <h4 className="company-details__role-dates">{`${formatMonthYear(
                role.startDate
              )} - ${
                role.endDate ? formatMonthYear(role.endDate) : 'Present'
              }`}</h4>
            </>
          );
        })}
    </Details>
  );
};

export default CompanyDetails;
