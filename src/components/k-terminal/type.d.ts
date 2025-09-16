declare namespace KTerminal {
  /**
   * Output status
   */
  type OutputStatusType = 'info' | 'success' | 'warning' | 'error' | 'system'

  /**
   * Output type
   */
  interface OutputType {
    type: 'command' | 'text' | 'component'
    text?: string
    resultList?: OutputType[]
    component?: any
    status?: OutputStatusType
    props?: any
    collapsible?: boolean
  }

  /**
   * Command output type
   */
  interface CommandOutputType extends OutputType {
    type: 'command'
    text: string
    resultList: OutputType[]
  }

  /**
   * Text output type
   */
  interface TextOutputType extends OutputType {
    type: 'text'
    text: string
  }

  /**
   * Component output type
   */
  interface ComponentOutputType extends OutputType {
    type: 'component'
    component: any
    props?: any
  }

  /**
   * Command input type
   */
  interface CommandInputType {
    text: string
    placeholder?: string
  }

  interface TerminalType {
    // clear screen
    clear: () => void
    // immediate output
    writeOutput: (output: OutputType) => void
    // immediate output text
    writeTextOutput: (text: string, status?: OutputStatusType) => void
    // write command text result
    writeTextResult: (text: string, status?: OutputStatusType) => void
    // write command error text result
    writeTextErrorResult: (text: string) => void
    // write command success text result
    writeTextSuccessResult: (text: string) => void
    writeResult: (output: OutputType) => void
    focusInput: () => void
    isInputFocused: () => boolean
    setTabCompletion: () => void
    doSubmitCommand: () => void
    showNextCommand: () => void
    showPrevCommand: () => void
    listHistoryCommand: () => CommandOutputType[]
    toggleAllCollapse: () => void
    setCommandCollapsible: (collapsible: boolean) => void
  }
}
