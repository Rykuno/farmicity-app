// @flow
import * as React from 'react';
import Layout from '../components/Layout';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <Layout>
        <React.Fragment>{children}</React.Fragment>
      </Layout>
    );
  }
}
