import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { List } from 'components/List/List';
import ListItem from 'components/List/ListItem';
import { Company } from 'models/company.model';
import CompanyService from 'services/company.service';

interface CompanyListState {
  isLoading: boolean;
  companies: Company[];
}

export default class CompanyList extends Component<
  RouteComponentProps,
  CompanyListState
> {
  private companyService: CompanyService;

  constructor(props: RouteComponentProps) {
    super(props);

    this.companyService = new CompanyService();
    this.state = {
      isLoading: false,
      companies: [],
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  render() {
    return (
      <List title="Companies" isLoading={this.state.isLoading}>
        {this.state.companies.map((company) => (
          <ListItem
            key={company.id}
            title={company.name}
            subtitle={company.shortDescription}
            body={company.longDescription}
          />
        ))}
      </List>
    );
  }

  private fetchProjects(): void {
    this.setState({ isLoading: true });
    this.companyService
      .getCompanies()
      .then((companies) =>
        this.setState({ companies: companies, isLoading: false })
      );
  }
}
