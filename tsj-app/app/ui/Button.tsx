import { FC , PropsWithChildren} from 'react'
import { Pressable, Text, View, PressableProps } from 'react-native'
import cn from 'clsx'

interface IButton extends PressableProps {}

const Button: FC<PropsWithChildren<IButton>>  = ({children,className,...rest}) => {
  return (
    <Pressable className={cn('self-center mt-4 bg-amber-800 py-3 px-8 rounded',className)} {...rest}>
			<Text className='font-semibold  '>{children}</Text>
		</Pressable>
  )
}

export default Button