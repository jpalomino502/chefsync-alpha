"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SidebarContextValue = {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  isMobile: boolean
  state: "expanded" | "collapsed"
}

const SidebarContext = React.createContext<SidebarContextValue>({
  expanded: true,
  setExpanded: () => {},
  isMobile: false,
  state: "expanded",
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({ children, defaultOpen = true }: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const state = expanded ? "expanded" : "collapsed"

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, isMobile, state }}>{children}</SidebarContext.Provider>
  )
}

const sidebarVariants = cva(
  "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
  {
    variants: {
      state: {
        expanded: "w-64",
        collapsed: "w-[70px]",
      },
      mobile: {
        true: "w-64 -translate-x-full",
        false: "",
      },
    },
    compoundVariants: [
      {
        mobile: true,
        state: "expanded",
        class: "translate-x-0",
      },
    ],
  },
)

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { expanded, isMobile, state } = useSidebar()

  return (
    <>
      <div className={cn(sidebarVariants({ state, mobile: isMobile }), className)} {...props} />
      {isMobile && expanded && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => useSidebar().setExpanded(false)} />
      )}
    </>
  )
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("px-3 py-2", className)} {...props} />
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn("mt-auto px-3 py-2", className)} {...props} />
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <div className={cn("", className)} {...props} />
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  tooltip?: string
}

export function SidebarMenuButton({ className, children, isActive, tooltip, ...props }: SidebarMenuButtonProps) {
  const { expanded } = useSidebar()

  const renderButton = () => (
    <button
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-md px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )

  if (!expanded && tooltip) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{renderButton()}</TooltipTrigger>
          <TooltipContent side="right" className="border-sidebar-border">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return renderButton()
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { expanded, setExpanded, isMobile } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      onClick={() => setExpanded(!expanded)}
      {...props}
    >
      {isMobile ? (
        <Menu className="h-4 w-4" />
      ) : expanded ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4 rotate-180" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  const { expanded, isMobile, state } = useSidebar()
  const sidebarWidth = expanded ? 256 : 70

  if (isMobile) {
    return <div className={cn("h-full", className)} {...props} />
  }

  return (
    <div
      className={cn("h-full transition-all duration-300 ease-in-out", className)}
      style={{ marginLeft: `${sidebarWidth}px` }}
      {...props}
    />
  )
}

