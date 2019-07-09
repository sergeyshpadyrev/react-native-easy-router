import uuid from 'uuid/v4'

const defaultTransitionProps = {
    animation: 'right',
    duration: 250,
    easing: 'ease-in-out'
}

const isDefinedByString = screen => typeof screen === 'string'

export const createScreen = screen => {
    const normilized = isDefinedByString(screen)
        ? { props: {}, screen, transitionProps: defaultTransitionProps }
        : {
              props: screen.props || {},
              screen: screen.screen,
              transitionProps: !!screen.transitionProps
                  ? { ...defaultTransitionProps, ...screen.transitionProps }
                  : defaultTransitionProps
          }
    return { id: uuid(), ...normilized }
}

export const createInitialStack = (initialStack, screens) => {
    return isDefinedByString(initialStack)
        ? [createScreen(initialStack)]
        : initialStack.map(createScreen)
}

export const screenStyle = {
    backgroundColor: 'white',
    height: '100%',
    position: 'absolute',
    width: '100%'
}
