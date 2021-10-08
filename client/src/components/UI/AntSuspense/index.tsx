import React, {Suspense} from 'react';
import {Spin} from 'antd'
import { WrapContent } from '../WrapContent';


const AntSuspense: React.FC = (props) => {
	return (
			<>
				<Suspense
						fallback={
							<>
								<WrapContent
										height='100%'
										display='flex'
										width='100%'
										justifyContent='center'
										alignItems='center'
										position='absolute'
										zIndex='1001'
										backgroundColor='#ffffff40'
								>
									<Spin/>
								</WrapContent>
							</>
						}
				>
					{props.children}
				</Suspense>
			</>
	)
}

export default AntSuspense;
