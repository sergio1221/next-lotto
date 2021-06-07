import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Layout from 'components/layout';
import ProfileForm from 'components/form/profile-form';
import DataTable from 'containers/table/data-table';
import { parseJsonFile } from 'helpers/json';
import * as UserActions from 'store/actions/user';

const tabs = [
	{ title: 'Details', class: 'avatar' },
	{ title: 'Transactions', class: 'transactions' },
	{ title: 'Tickets', class: 'tickets' },
	{ title: 'Products', class: 'products' }
]

const MyAccount = ({ countries }) => {

	const [tab, setTab] = useState(0);
	const transactions = useSelector(state => state.user.transactions);
	const tickets = useSelector(state => state.user.tickets);
	const products = useSelector(state => state.user.products);

	const tabClicked = useCallback((index) => () => {
		setTab(index);
	}, []);

	return (
		<Layout>
			<main id="main" className="clearfix">
				<div className="wrap">
					<div className="wrap-my-account clearfix">
						<div className="my-account-title">
							<h1>My Account</h1>
						</div>
						<div className="my-account-contents">
							<div className="tab-bar-container">
								<ul className="tab-bar">
									{tabs.map((tab, index) => (
										<li className="tab-item" key={tab.title}>
										<a href="#" onClick={tabClicked(index)} className={tab === index ? 'active' : ''}>
											<i className={tab.class}>&nbsp;</i>
											<span>{tab.title}</span>
										</a>
									</li>
									))}
								</ul>
								<div className='actions-bar'>
									<div className='winning'>
										<span>Winning Money</span>
										<span className='money'>€ {'0.00'}</span>
									</div>
									<div className='buttons'>
										<Link href='/user/deposit'><a className='button'>Deposit</a></Link>
										<Link href='/user/withdraw'><a className='button'>Withdraw</a></Link>
									</div>
								</div>
							</div>
							<div className="tab-page">
								{tab === 0 && (
									<ProfileForm countries={countries} />
								)}
								{tab === 1 && (
									<DataTable
										headers={['Transactions', 'ID', 'Date', 'Amount', 'Lottery', 'Product']}
										values={transactions}
										action={UserActions.getTransactions}
									/>
								)}
								{tab === 2 && (
									<DataTable
										headers={['Country', 'Lottery', 'Type', 'Date', 'Status', 'Winnings', 'Details']}
										values={tickets}
										action={UserActions.getTickets}
									/>
								)}
								{tab === 3 && (
									<DataTable
										headers={['Product', 'Lottery', 'Group Shares', 'Draws Left', 'Total Lines', 'Purchased on', 'End Date', 'Status']}
										values={products}
										action={UserActions.getProducts}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export const getStaticProps = async (ctx) => {
	const countries = await parseJsonFile('data/countries.json');
	return {
		props: {
			countries
		}
	}
}

export default MyAccount
