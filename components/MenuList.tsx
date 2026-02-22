/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"
import Link from "next/link"
import { Instagram } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Polos",
    href: "/catalogo/polos",
    description:
      "Polos cómodos y versátiles para el día a día con estilo.",
  },
  {
    title: "Tops",
    href: "/catalogo/tops",
    description:
      "Tops que realzan tu figura y combinan con todo.",
  },
  {
    title: "Corset",
    href: "/catalogo/corsets",
    description:
      "Corsets ideales para resaltar tu estilo en cualquier ocasión.",
  },
  {
    title: "Body",
    href: "/catalogo/body",
    description: "Body femeninos para looks casuales o elegantes.",
  },
  {
    title: "Blusas",
    href: "/catalogo/blusas",
    description:
      "Blusas que complementan tu estilo y destacan en cualquier ocasión.",
  },
]

const MenuList = () => {

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap lg:gap-x-9">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/nosotros" className="font-medium">Nosotros</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">Catálogo</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid gap-2 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
              {components.map((component) => (
                <ListItem
                  className="hover:bg-gray-200/60 rounded-xl"
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="cursor-pointer">Encuéntranos</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className="grid w-50 gap-4" >
              <li>
                <NavigationMenuLink asChild className="hover:bg-gray-200/60 rounded-xl">
                  <Link href="https://www.instagram.com/shanti.blush/" className="flex-row items-center gap-2" target="_blank"
                    rel="noopener noreferrer">
                    <Instagram /> Instagram
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild className="hover:bg-gray-200/60 rounded-xl">
                  <Link href="https://www.tiktok.com/@shanti.blush" className="flex-row items-center gap-2" target="_blank"
                    rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1">
                      <title>tiktok</title>
                      <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z" />
                    </svg> Tiktok
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}


function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default MenuList;
