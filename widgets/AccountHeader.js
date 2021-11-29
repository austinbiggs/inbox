import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { Header } from '../components';

export default function AccountHeader({ ...props }) {
  const router = useRouter();

  return (
    <Header className="mt-md-5" {...props}>
      <Header.Body>
        <Row className="align-items-center">
          <Col>
            <Header.Pretitle>Overview</Header.Pretitle>
            <Header.Title>Account</Header.Title>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col>
            <Header.Tabs className="nav-overflow">
              <Nav.Item>
                <Link href="/account-general" passHref>
                  <Nav.Link active={router.pathname === '/account-general'}>General</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/account-billing" passHref>
                  <Nav.Link active={router.pathname === '/account-billing'}>Billing</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/account-members" passHref>
                  <Nav.Link active={router.pathname === '/account-members'}>Members</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/account-security" passHref>
                  <Nav.Link active={router.pathname === '/account-security'}>Security</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/account-notifications" passHref>
                  <Nav.Link active={router.pathname === '/account-notifications'}>Notifications</Nav.Link>
                </Link>
              </Nav.Item>
            </Header.Tabs>
          </Col>
        </Row>
      </Header.Body>
    </Header>
  );
}
