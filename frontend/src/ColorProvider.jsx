import PropTypes from 'prop-types';
import { useColorModeValue } from '@chakra-ui/react';
import ColorContext from './ColorContext'

export const ColorProvider = ({ children }) => {
	const bgColor = useColorModeValue('bgColor.light', 'bgColor.dark');
	const borderColor = useColorModeValue('borderColor.light', 'borderColor.dark');
	const avatarBorderColor = useColorModeValue('avatarBorderColor.light', 'avatarBorderColor.dark');
	const highlightedBorderColor = useColorModeValue('highlightedBorderColor.light', 'highlightedBorderColor.dark');
	const iconHoverColor = useColorModeValue('iconHoverColor.light', 'iconHoverColor.dark');
	const bgHoverColor = useColorModeValue('bgHoverColor.light', 'bgHoverColor.dark');
	const threadColor = useColorModeValue('threadColor.light', 'threadColor.dark');
	const postTextColor = useColorModeValue('postTextColor.light', 'postTextColor.dark');
	const countColor = useColorModeValue('countColor.light', 'countColor.dark');

	const colors = {
		bgColor,
		borderColor,
		avatarBorderColor,
		highlightedBorderColor,
		iconHoverColor,
		bgHoverColor,
		threadColor,
		postTextColor,
		countColor,
	};

	return (
		<ColorContext.Provider value={colors}>
			{children}
		</ColorContext.Provider>
	);
};

ColorProvider.propTypes = {
  children: PropTypes.any.isRequired,
};